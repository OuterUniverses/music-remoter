from flask import Flask, request
from pydub import AudioSegment, playback
import requests
from io import BytesIO

app = Flask(__name__)

app.config['NETEASE_USER_COOKIE'] = None

def play_netease_music(music_url):
    headers = {'Cookie': f'user_cookie={app.config["NETEASE_USER_COOKIE"]}'}
    response = requests.get(music_url, headers=headers)
    music_data = BytesIO(response.content)

    music = AudioSegment.from_file(music_data)

    playback.play(music)
    pass

@app.route("/netease", methods=["POST"])
def netease():
    music_url = request.args["url"]
    try:
        play_netease_music(music_url)
        return "OK"
    except Exception as e:
        abort(404)
    return "OK"

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)