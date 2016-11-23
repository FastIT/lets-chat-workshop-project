import Rx from 'rxjs/Rx';
import io from 'socket.io-client'

export class ChannelService {

  constructor(username, serverUrl) {

    this.username = username

    this._subject = new Rx.Subject();

    this._socket = io(serverUrl + '/general');

    // Connect and login
    this._socket.on('connect', () => {
      // Receive last messages
      this._socket.emit('user:login', this.username, (data) => {
        data.forEach( msg => this._subject.next(msg) );
      });
    });

    // Message received
    this._socket.on('user:message', (msg) => {
      this._subject.next(msg);
    });

    // User joined
    //this._socket.on('user:joined', (msg) => {
      //this._subject.next({
        //time: msg.time,
        //username: msg.username,
        //text: `User ${msg.username} joined`
      //});
    //});

  }

  dispatch(msg) {
    this._socket.emit('message', msg);
    // socket.emit(`client:${this.id}`, msg);
  }

  subscribe(fct,err) {
    return this._subject.subscribe(fct,(err)=>{console.log(err)});
  }


}

function getUsernameFromLS() {
  let userName = localStorage.getItem('username');
  if (userName === undefined || userName === '' || userName === null){
    userName = prompt('Enter your username');
    localStorage.setItem('username', userName);
  }
  return userName
}

export class Toto{
}

const username = "Nicolas SAVOIS" //getUsernameFromLS();
const serverUrl = 'http://127.0.0.1:3001'
export default new ChannelService(username, serverUrl);
