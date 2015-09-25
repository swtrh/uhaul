var superagent = require('superagent');
var expect = require('expect.js');


describe ('location api', function () {
  var request_url = 'http://localhost:3000/api/location';
  var id;

  it ('retrieves a collection of locations', function (done) {
    superagent.get(request_url)
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item.name})).to.contain('Trondheim');
        done();
      });
  });

  it ('retrieves a location', function (done) {
    superagent.get(request_url + '/Trondheim')
      .end(function (e, res) {
        console.log(res.body);
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(typeof res.body).to.eql('object');
        expect(res.body.name).to.eql('Trondheim');
        done();
      });
  });

});

