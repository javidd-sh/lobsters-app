from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    post_id = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    num_comments = Column(Integer, nullable=False)
    url = Column(String, nullable=False)
    permalink = Column(String, nullable=False)
    created_utc = Column(Float, nullable=False)
    fetched_at = Column(DateTime, nullable=False)

    def __repr__(self):
        return f"<Post id={self.id} title={self.title[:30]!r} score={self.score}>"

    def to_dict(self) -> dict:
        """
        Converts this Post row into a plain dict – useful for turning
        SQLAlchemy objects into JSON later in the API layer.
        """
        return {
            "id": self.id,
            "post_id": self.post_id,
            "title": self.title,
            "author": self.author,
            "score": self.score,
            "num_comments": self.num_comments,
            "url": self.url,
            "permalink": self.permalink,
            "created_utc": self.created_utc,
            "fetched_at": self.fetched_at.isoformat() if self.fetched_at else None
        }