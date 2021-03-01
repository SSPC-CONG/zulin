class Global{
  static token = window.sessionStorage.getItem('token');
  static user =JSON.parse(window.sessionStorage.getItem('user'));
}
export default Global;