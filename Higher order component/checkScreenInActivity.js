class CheckInactivity extends Window{
   constructor(props){
      super(props);
      this.timeout = timeout;
      this.onTimeout = onTimeout;
      const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
      if (expiredTime > 0 && expiredTime < Date.now()) {
         onExpired();
         return;
      }
      this.eventhandler = this.updateExpiredTime.bind(this);
      this.tracker();
      this.startInterval();
      this.cleanUp();
   }
   startInterval(){
      this.updateExpiredTime();
      this.interval = setInterval(() => {
         const expiredTime = parseInt(localStorage.getItem("_expirationTime"),10)
         if(expiredTime < Date.now()){
            if(this.onTimeout){
               this.onTimeout()
               this.cleanUp()
            }
            console.log('Timeout');
         }
      },1000)
   }
   updateExpiredTime(){
      if (this.timeoutTracker) {
         clearTimeout(this.timeoutTracker);
      }
      this.timeoutTracker = setTimeout(() => {
         localStorage.setItem("_expirationTime",new Date().now + this.timeout * 1000);
      },300);
   }
   tracker(){
      window.addEventListener('mousemove',this.eventhandler)
      window.addEventListener('keydown',this.eventhandler)
      window.addEventListener('scroll',this.eventhandler)
   }
   cleanUp(){
      localStorage.removeItem("_expirationTime")
      clearInterval(this.interval)
      window.removeEventListener('mousemove',this.eventhandler)
      window.removeEventListener('keydown',this.eventhandler)
      window.removeEventListener('scroll',this.eventhandler)
   }
}
export default CheckInactivity;