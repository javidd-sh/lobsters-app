from flask import Flask, jsonify, request
from flask_cors import CORS
from app import service

app = Flask(__name__)
CORS(app)

@app.route("/api/health")
def health():
    return jsonify({"success": True, "status": "ok"})

@app.route("/api/posts/top")
def top_posts():
    limit = request.args.get("limit", 10)
    result = service.get_top_posts_for_api(limit)
    return jsonify(result), 200

@app.route("/api/posts/<string:post_id>")
def get_post(post_id):
    result = service.get_single_post_for_api(post_id)
    if result["success"] is False:
        return jsonify(result), 404
    return jsonify(result), 200

@app.route("/api/stats")
def stats():
    result = service.get_stats()
    return jsonify(result), 200