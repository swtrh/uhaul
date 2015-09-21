var superagent = require('superagent');
var expect = require('expect.js');

describe ('express rest api server', function () {
  var request_url = 'http://localhost:3000/api/movingOrders';
  var id;

  it ('posts an order', function (done) {
    superagent.post(request_url)
      .send({
        "registeredBy": "Anonymous",
        "date": new Date(),
        "type": "single",
        "location": {
          "name": "Trondheim",
          "sites": [
            "TR-RO"
          ]
        },
        "mover": {
          "name": "Jørn Ølmheim",
          "organization": "ITV DRS RTS"
        },
        "from": {
          "code": "TR-RO"
        },
        "to": {
          "code": "TR-RO"
        }
      })
      .end(function (e, res) {
        //console.log(res);
        expect(e).to.eql(null);
        expect(res.status).to.eql(201);
        expect(res.body._id.length).to.eql(24);
        id = res.body._id;
        done();
      });
  });

  it ('retrieves an order', function (done) {
    superagent.get(request_url + '/' + id)
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it ('retrieves a collection of orders', function (done) {
    superagent.get(request_url)
      .end(function (e, res) {
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it  ('updates an order', function (done) {
    superagent.put(request_url + '/' + id)
      .send({
        "registeredBy": "Anonymous",
        "date": new Date(),
        "type": "single",
        "location": {
        "name": "Trondheim",
          "sites": [
            "TR-RO"
          ]
        },
        "mover": {
          "name": "Arve Skogvold",
          "organization": "ITV DIS RD"
        },
        "from": {
          "code": "TR-RO"
        },
        "to": {
          "code": "TR-RO"
        }
      })
      .end(function (e, res) {
        //console.log(e);
        //console.log(res.body);
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        done();
      });
    });

    it ('checks an updated object', function (done) {
      superagent.get(request_url + '/' + id)
        .end(function (e, res) {
          // console.log(res.body)
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.eql(24);
          expect(res.body._id).to.eql(id);
          expect(res.body.mover.name).to.eql('Arve Skogvold');
          done();
        });
    });

    it ('removes an order', function (done) {
      superagent.del(request_url + '/' +id)
        .end(function (e, res) {
          //console.log(e);
          // console.log(res.body)
          expect(e).to.eql(null);
          expect(res.status).to.eql(204);
          superagent.get(request_url + '/' + id)
            .end(function (e, res) {
              expect(res.status).to.eql(404);
              done();
            });
        });
    });
});
