package org.openvasp.host.rest;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public class PageResponse<T> extends PageImpl<T> {

    @JsonCreator
    public PageResponse(
            @JsonProperty("content") List<T> content,
            @JsonProperty("number") int number,
            @JsonProperty("size") int size,
            @JsonProperty("totalElements") long totalElements,
            @JsonProperty("pageable") JsonNode pageable) {

        super(content, PageRequest.of(number, size), totalElements);
    }

    @Override
    public String toString() {
        return "PageResponse(number=" + getNumber()
                + ", size=" + getSize()
                + ", totalElements=" + getTotalElements()
                + ", content=" + getContent() + ")";
    }

}

