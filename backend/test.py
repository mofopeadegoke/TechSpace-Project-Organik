from flask import Flask, send_from_directory
app  = Flask(__name__)

@app.route('/', defaults = {'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    if path and path != 'favicon.ico':
        return send_from_directory('/react-app/build', path)
    return send_from_directory('/react-app/build', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)