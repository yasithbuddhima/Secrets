# Secrets


#### Description:
Secrets is a web application built with Node.js that allows users to submit their secrets anonymously. Users can view others' secrets without revealing their identities, promoting a safe space for sharing thoughts and experiences.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yasithbuddhima/Secrets.git
```
2. Navigate to the project directory:
```bash
 cd Secrets
```

3. Install dependencies:
```bash
npm install
```

## Usage
To run the application, 
1. First create .env file
```bash
touch .env
```

2. Add your credentials

```bash
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```
3. execute:
```bash
node app.js
```

4. Open your browser and go to http://localhost:3000 
#

5. **Sign In** : Use the Google authentication to sign in
6. **Submit a Secret**: After signing in, submit your secret through the provided form.
7. **View Secrets**: Browse the list of secrets submitted by other users.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License 
####  [MIT](https://choosealicense.com/licenses/mit/)
Copyright 2024 yasithbuddhima 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.