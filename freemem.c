int free_mem(addr_t address, struct pcb_t *proc)
{
    /*TODO: Release memory region allocated by [proc]. The first byte of
	 * this region is indicated by [address]. Task to do:
	 * 	- Set flag [proc] of physical page use by the memory block
	 * 	  back to zero to indicate that it is free.
	 * 	- Remove unused entries in segment table and page tables of
	 * 	  the process [proc].
	 * 	- Remember to use lock to protect the memory from other
	 * 	  processes.  */

    pthread_mutex_lock(&mem_lock);

    addr_t v_address = address;
    addr_t p_address = 0;

    /*Check physical address in mem*/
    if (!translate(v_address, &p_address, proc))
        return 1;

    /*Clear physical page*/
    addr_t p_seg_page_index = p_address >> OFFSET_LEN;
    int num_pages = 0; // Number of pages freed
    int i;
    for (i = p_seg_page_index; i != -1; i = _mem_stat[i].next)
    {
        num_pages++;
        _mem_stat[i].proc = 0; // Free physical page
    }

    /*Clear virtual page*/
    for (i = 0; i < num_pages; i++)
    {
        addr_t v_addr = v_address + i * PAGE_SIZE;
        addr_t v_segment_index = get_first_lv(v_addr);
        addr_t v_page_index = get_second_lv(v_addr);
        struct seg_table_t *seg_table = proc->seg_table;
        struct page_table_t *page_table = get_page_table(v_segment_index, seg_table);

        int j;
        for (j = 0; j < page_table->size; j++)
        {
            if (page_table->table[j].v_index == v_page_index)
            {
                int last_index = --page_table->size;
                page_table->table[j] = page_table->table[last_index];
                break;
            }
        }

        /*Check to remove unused entries in seg_table*/
        if (page_table->size == 0)
        {
            for (j = 0; j < seg_table->size; j++)
            {
                if (seg_table->table[j].v_index == v_segment_index)
                {
                    int slast_index = --seg_table->size;
                    seg_table->table[i] = seg_table->table[slast_index];
                    seg_table->table[slast_index].v_index = 0;
                    free(seg_table->table[slast_index].pages);
                    break;
                }
            }
        }
    }

    pthread_mutex_unlock(&mem_lock);
    return 0;
}
