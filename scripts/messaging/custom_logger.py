import logging
from time_utils import get_timestamp

class CustomFormatter(logging.Formatter):
    def format(self, record):
        log_message = f"[{get_timestamp()}][{record.name}] {record.getMessage()}"

        return log_message

def setup_logger(name):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    
    formatter = CustomFormatter()
    console_handler.setFormatter(formatter)
    
    if not logger.handlers:
        logger.addHandler(console_handler)

    return logger
