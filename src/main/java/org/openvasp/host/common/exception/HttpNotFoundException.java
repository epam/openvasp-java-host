package org.openvasp.host.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class HttpNotFoundException extends RuntimeException {

    public HttpNotFoundException(String format, Object... args) {
        super(String.format(format, args));
    }

    public HttpNotFoundException(Throwable ex, String format, Object... args) {
        super(String.format(format, args), ex);
    }

}
