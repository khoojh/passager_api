var app = require('../server.js');
// var app = require('../../index.js');
var request = require('supertest');
var chai_expect = require('chai').expect;

describe('[PASSAGES]', () => {
    it('should get all passages', (done) => {
        request(app)
            .get('/api/passages')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                chai_expect(resp.body).to.be.an('array');
                done();
            })
    });

    it('should get a passage', (done) => {
        var passage = {
            author: "Stephen King",
            book: "Different Seasons: The Body",
            content: "But five hundred million Red Chinese don't give a shit, right? The most important things are the hardest to say, because words diminish them. It's hard to make strangers care about the good things in your life."
        };
        request(app)
            .post('/api/passages')
            .send(passage)
            .set('Accept', 'application/json')
            .end((err, resp) => {
                var passage = resp.body;
                request(app)
                    .get('/api/passages/' + passage.id)
                    .expect(200)
                    .end((err, resp) => {
                        var returnedPassage = resp.body;
                        returnedPassage.id = passage.id;
                        passage.dateCreated = returnedPassage.dateCreated;
                        chai_expect(returnedPassage).to.eql(passage);
                        done();
                    });
            });
    });

    it('should create a passage', (done) => {
        var passage = {
            author: "Stephen King",
            book: "Different Seasons: The Body",
            content: "But five hundred million Red Chinese don't give a shit, right? The most important things are the hardest to say, because words diminish them. It's hard to make strangers care about the good things in your life."
        };
        request(app)
            .post('/api/passages')
            .send(passage)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, resp) => {
                var returnedPassage = resp.body;
                passage.id = returnedPassage.id;
                passage.dateCreated = returnedPassage.dateCreated;
                chai_expect(returnedPassage).to.eql(passage);
                done();
            });
    });

    it('should delete a passage', (done) => {
        var passage = {
            author: "Stephen King",
            book: "Different Seasons: The Body",
            content: "But five hundred million Red Chinese don't give a shit, right? The most important things are the hardest to say, because words diminish them. It's hard to make strangers care about the good things in your life."
        };
        request(app)
            .post('/api/passages')
            .send(passage)
            .set('Accept', 'application/json')
            .end((err, resp) => {
                var passage = resp.body;
                request(app)
                    .delete('/api/passages/' + passage.id)
                    .end((err, resp) => {
                        var deletedPassage = resp.body;
                        chai_expect(deletedPassage).to.eql(passage);
                        done();
                    });
            });
    });

    it('should update a passage', (done) => {
        var passage = {
            author: "Stephen King",
            book: "Different Seasons: The Body",
            content: "But five hundred million Red Chinese don't give a shit, right? The most important things are the hardest to say, because words diminish them. It's hard to make strangers care about the good things in your life."
        };
        request(app)
            .post('/api/passages')
            .send(passage)
            .set('Accept', 'application/json')
            .end((err, resp) => {
                var passage = resp.body;
                request(app)
                    .patch('/api/passages/' + passage.id)
                    .send({
                        author: "Richard Bachman"
                    })
                    .end((err, resp) => {
                        chai_expect(resp.body.author).to.equal('Richard Bachman');
                        done();
                    });
            });
    });

});
