package org.openvasp.host.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class HttpServiceException extends RuntimeException {

    public HttpServiceException() {
    }

    public HttpServiceException(Throwable cause) {
        super(cause);
    }

    public HttpServiceException(String format, Object... args) {
        super(String.format(format, args));
    }

    public HttpServiceException(Throwable cause, String format, Object... args) {
        super(String.format(format, args), cause);
    }

}
