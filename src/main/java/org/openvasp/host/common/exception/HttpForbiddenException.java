package org.openvasp.host.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class HttpForbiddenException extends RuntimeException {

    public HttpForbiddenException(String format, Object... args) {
        super(String.format(format, args));
    }

    public HttpForbiddenException(Throwable ex, String format, Object... args) {
        super(String.format(format, args), ex);
    }

}
