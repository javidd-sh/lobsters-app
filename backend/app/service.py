from app import repository

MAX_LIMIT = 50

def get_top_posts(limit):
    limit = max(1, min(int(limit), MAX_LIMIT))
    posts = repository.get_top_posts(limit)
    return {
        "success": True,
        "data": [p.to_dict() for p in posts]
    }

def get_post_by_id(post_id):
    post = repository.get_post_by_id(post_id)
    if post is None:
        return None
    return {
        "success": True,
        "data": post.to_dict()
    }

def get_stats():
    count = repository.count_posts()
    avg = repository.get_average_score()
    return {
        "success": True,
        "data": {
            "total_posts": count,
            "average_score": round(avg, 2)
        }
    }