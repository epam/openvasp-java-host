package org.openvasp.host.service.impl;

import lombok.NonNull;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.bouncycastle.util.encoders.Base64;
import org.openvasp.client.config.VaspModule;
import org.openvasp.host.model.cfg.HostConfig;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public class VaspHostModule extends VaspModule {

    private static final String INFURA_SECRET_KEY_1 = "infuraSecret";
    private static final String INFURA_SECRET_KEY_2 = "INFURA_ROPSTEN_SECRET";

    public VaspHostModule(@NonNull final HostConfig hostConfig) {
        super(hostConfig.getVaspConfig());

        String infuraSecret = null;
        if (StringUtils.isNotEmpty(hostConfig.getInfuraSecret())) {
            infuraSecret = ":" + hostConfig.getInfuraSecret();
        } else if (StringUtils.isNotEmpty(System.getProperty(INFURA_SECRET_KEY_1))) {
            infuraSecret = ":" + System.getProperty(INFURA_SECRET_KEY_1);
        } else if (StringUtils.isNotEmpty(System.getenv(INFURA_SECRET_KEY_2))) {
            infuraSecret = ":" + System.getProperty(INFURA_SECRET_KEY_2);
        }

        if (StringUtils.isNotEmpty(infuraSecret)) {
            val auth = Base64.toBase64String(infuraSecret.getBytes());
            contractHttpService.addHeader("Authorization", "Basic " + auth);
        }
    }

}
