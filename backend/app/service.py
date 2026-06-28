from app import repository

MAX_LIMIT = 50

def get_top_posts_for_api(limit):
    limit = max(1, min(int(limit), MAX_LIMIT))
    posts = repository.get_top_posts(limit)
    data = [p.to_dict() for p in posts]
    return {
        "success": True,
        "count": len(data),
        "data": data
    }

def get_single_post_for_api(post_id):
    post = repository.get_post_by_id(post_id)
    if post is None:
        return {"success": False, "error": "Post tapılmadı"}
    return {
        "success": True,
        "data": post.to_dict()
    }

def get_stats_for_api():
    count = repository.count_posts()
    avg = repository.get_average_score()
    return {
        "success": True,
        "data": {
            "total_posts": count,
            "average_score": round(avg, 2)
        }
    }