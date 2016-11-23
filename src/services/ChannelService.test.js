import {ChannelService} from './ChannelService'

describe('ChannelService Service test', () => {

  it('should start a test', () => {
    //best test in the world ! Ever
    expect(true).toEqual(true);
  });

  it('should return a message when pushing a message', (done) => {
    const channel = new ChannelService("nico", "http://127.0.0.1/");
    // subscribing to channel

    channel.subscribe((msg) => {
      console.log(msg);
      // expecting username
      expect(msg.username).toEqual("nico");
      // expecting message
      expect(msg.text).toEqual("Coucou");
      // expecting a timestamp
      expect(msg.time).toBeDefined();
      done();
    } , (err) => {
      console.log(err);
      done(err);
    });
    channel.dispatch({
      username:"nico",
      text:"Coucou"
    });
  });


});
