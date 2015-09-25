var superagent = require('superagent');
var expect = require('expect.js');


describe ('relocation request api', function () {
  var request_url = 'http://localhost:3000/api/relocationRequest';
  var id;

  it ('posts a relocation request', function (done) {
    superagent.post(request_url)
      .send({
        requestor: {
          employeenumber: '633739',
          name: 'Jørn Ølmheim',
          department: 'ITV DRS RTS',
          phone: '+4799165627',
          email: 'joe@statoil.com'
        },
        from: {
          code: "TR-RO",
          block_floor: "3.3",
          workspace: "3.3.450B"
        },
        to: {
          code: "TR-RO",
          block_floor: "3.3",
          workspace: "3.3.451B",
          new_department: ""
        },
        comment: "Testing"
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

  it ('retrieves a relocation request', function (done) {
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

  it ('retrieves a collection of relocation requests', function (done) {
    superagent.get(request_url)
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it  ('updates a relocation request', function (done) {
    superagent.put(request_url + '/' + id)
      .send({requestor: {
        employeenumber: '633739',
          name: 'Jørn Ølmheim',
          department: 'ITV DRS RTS',
          phone: '+4799165627',
          email: 'joe@statoil.com'
        },
        from: {
          code: "TR-RO",
          block_floor: "3.3",
          workspace: "3.3.450B"
        },
        to: {
          code: "TR-RO",
          block_floor: "3.3",
          workspace: "3.3.451B",
          new_department: ""
        },
        comment: "Updated with new info"
      })
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        done();
      });
    });

    it ('checks an updated request', function (done) {
      superagent.get(request_url + '/' + id)
        .end(function (e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.eql(24);
          expect(res.body._id).to.eql(id);
          expect(res.body.comment).to.eql('Updated with new info');
          done();
        });
    });

    it ('removes a request', function (done) {
      superagent.del(request_url + '/' +id)
        .end(function (e, res) {
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
