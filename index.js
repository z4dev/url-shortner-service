import express from 'express';

const app = express();

import _ from 'lodash';

app.use(express.json());



const DOMAIN = "http://localhost:3000"
const urlSchema = {
    URLS : []
}



app.post('/shorten', (req, res) => {
    const { url } = req.body;
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const characters = alphabet + numbers;

    const generateRandomString = (length) => {
       let result = '';
       for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
       }
       return result;
    };
    
    const randomGeneratedUrl = generateRandomString(6);
    urlSchema.URLS.push({
        originalUrl: url,
        code: `${randomGeneratedUrl}`,
        shortUrl : `${DOMAIN}/${randomGeneratedUrl}`
    });
    res.json({
        originalUrl: url,
        code: `${randomGeneratedUrl}`,
        shortUrl : `${DOMAIN}/${randomGeneratedUrl}`
    });
});

app.get('/:id',(req,res)=>{


    const {id} = req.params;


    const urlData = urlSchema.URLS.find((entry)=> entry.code == id)
    console.log(urlData);

    if(urlData){
        res.redirect(urlData.originalUrl);
    }

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
