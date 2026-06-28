from app.db import get_session
from app.models import Post

def get_top_posts(limit):
    session = get_session()
    try:
        posts = session.query(Post).order_by(Post.score.desc()).limit(limit).all()
        return posts
    finally:
        session.close()

def get_post_by_id(post_id):
    session = get_session()
    try:
        post = session.query(Post).filter(Post.post_id == post_id).first()
        return post
    finally:
        session.close()

def count_posts():
    session = get_session()
    try:
        return session.query(Post).count()
    finally:
        session.close()

def get_average_score():
    session = get_session()
    try:
        from sqlalchemy import func
        result = session.query(func.avg(Post.score)).scalar()
        return result or 0
    finally:
        session.close()