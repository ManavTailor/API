const express = require('express')
const port = 3000
const server = express()
const {  z } = require('zod')

const social = [
    {
        id: 1,
        content: 'Image post',
        'no of likes': 10,
        ImageURL: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
        'Posted At': '2023-9-2 12:00:00',
    },
    {
        id: 2,
        content: 'Video post',
        'no of likes': 20,
        VideoURL: 'https://youtube.com/shorts/1j9_HUeRauQ?si=-wGL79-Ffd6z_WOv',
        'Posted At': '2023-9-4 1:03:00',
    }
]

server.use(express.json())

server.get('/api/social', function (req, res) {
    res.send(social)
})

server.get('/api/social/:id', function (req, res) {
  const foundSocial = social.find((post) => post.id === parseInt(req.params.id));

  if (foundSocial) {
      res.send(foundSocial);
  } else {
      res.status(404).send('Not Found');
  }
});

server.post('/api/social/', function (req, res) {
    const newSocial = req.body
  
    newSocial.id = Math.random()
  
    social.push(newSocial)
  
    res.status(201).send('Created')
  })

server.patch('/api/social/:id', function (req, res) {
    const id = req.params.id;
    const data = req.body;

    const foundSocialIndex = social.findIndex(post => post.id === parseInt(id));

    if (foundSocialIndex > -1) {
        const old = social[foundSocialIndex];
        social[foundSocialIndex] = {
            ...old,
            ...data
        };
        res.send('Updated');
    } else {
        res.status(404).send('Not found');
    }
})

server.delete('/api/social/:id', function (req, res) {
    const foundSocialIndex = social.findIndex(post => post.id.toString() === req.params.id);

    if (foundSocialIndex > -1){
        social.splice(foundSocialIndex,1)
        res.send('Deleted')
    
    } else {
        res.status(404).send('Not found')
    }
})
const socialPostSchema = z.object({
    content: z.string().min(5).max(255),
    'no of likes': z.number().int().min(0),
  });


server.listen(port)
