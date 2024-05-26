#setup
python -m venv env

env\Scripts\activate

pip install -r requirements.txt

#run
uvicorn main:app --reload