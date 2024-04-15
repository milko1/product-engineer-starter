# Installation and Run

View instructions for completing this take-home assignment [here](https://co-helm.notion.site/Senior-Product-Engineer-Take-Home-6e82ec45cc2a46b59a0d9ee3aeb9449c).

Note: this needs testing! I'm on a time crunch so not adding it here but every line of code should be covered by tests and automatically enforced.

## Installation

Better to create virtual environment for Python (backend). There are multiple ways of doing this, this is one of them, using the standard `venv` module (from project home folder):

### Create python virtual environment

```:shell
python -m venv .env
```

### Activate virtual env

macOS/Linux:

```:shell
source .env/bin/activate
```

Windows:

```:shell
.env\bin\activate
```

### Then install python modules in package

Note: _fastapi_ was upgraded from _0.105.0_ to _0.109.0_ because of vulnerabilities in 0.105 version.
_uvicorn_ added to run _fastapi_ backend.

```:shell
cd backend
pip install -r requirements.txt
```

### Run backend (API)

```:shell
uvicorn main:app --reload
```

Note: _--reload_ parameter is optional for easier development and debugging, it should be removed in production.

### Install frontend libraries (from project home folder)

```:shell
cd frontend
npm install
```

### Run frontend

```:shell
npm run dev
```
