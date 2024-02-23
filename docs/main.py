from flask import Flask, render_template, request, jsonify
import joblib

app = Flask(__name__)

# Load the pre-trained model
model = joblib.load('breast_canc.joblib')
scaler = joblib.load('sc.joblib')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get input features from the request
        clumpThickness = float(request.form['clumpThickness'])
        cellSize = float(request.form['cellSize'])
        cellShape = float(request.form['cellShape'])
        adhesion = float(request.form['adhesion'])
        epithelialSize = float(request.form['epithelialSize'])
        bareNuclei = float(request.form['bareNuclei'])
        chromatin = float(request.form['chromatin'])
        nucleoli = float(request.form['nucleoli'])
        mitoses = float(request.form['mitoses'])
        print([clumpThickness, cellSize, cellShape, adhesion, epithelialSize, bareNuclei, chromatin, nucleoli, mitoses])
        scaled_features = scaler.transform([
            [clumpThickness, cellSize, cellShape, adhesion, epithelialSize, bareNuclei, chromatin, nucleoli, mitoses]])
        # Make a prediction
        prediction = model.predict(scaled_features)
        print(prediction)
        # Return the prediction as JSON
        return jsonify({'prediction': int(prediction[0])})

    return render_template('index.html')

if __name__ == '__main__':
    app.run(port=3000)
