import re
import urllib
from datetime import datetime

def get_date_from_linkedin_activity(post_url: str) -> str:
    try:
        post_url_unquote = urllib.parse.unquote(post_url)
        match = re.search(r"activity:(\d+)", post_url_unquote)
        if not match:
            return "Invalid LinkedIn ID"
        linkedin_id = match.group(1)
        first_41_bits = bin(int(linkedin_id))[2:43]
        timestamp_ms = int(first_41_bits, 2)
        timestamp_s = timestamp_ms / 1000
        return datetime.fromtimestamp(timestamp_s)

    except (ValueError, IndexError):
        return "Date not available"
