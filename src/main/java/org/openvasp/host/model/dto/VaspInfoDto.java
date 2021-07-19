package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.VaspCode;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class VaspInfoDto {

    private String id;
    private VaspCode vaspCode;
    private String name;

}
