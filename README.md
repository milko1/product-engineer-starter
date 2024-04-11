View instructions for completing this take-home assignment [here](https://co-helm.notion.site/Senior-Product-Engineer-Take-Home-6e82ec45cc2a46b59a0d9ee3aeb9449c).

## To install:

Better to create virtual environment for Python (backend). There are multiple ways of doing this, this is one of them, using the standard `venv` module (from project home folder):

```:shell
python -m venv .env
```

Activate virtual env:

### macOS/Linux

```:shell
source .env/bin/activate
```

### Windows

```:shell
.env\bin\activate
```

Then install python modules in package:

```:shell
cd backend
pip install -r requirements.txt
```

Install frontend libraries (from project home folder):

```:shell
cd frontend
npm install
```

Run:

```:shell
npm run dev
```
