let timerSetup = {
	template:`
	<form>
		 <label class="text-primary" for="min">Minutos<br />
		 <input type="number" v-model="minutes" name="time_m" id="min" min="0" max="59">
		 </label>
		 <label class="text-danger" for="sec">Segundos<br />
			  <input type="number" v-model="secondes" name="time_s" id="sec" max="59" min="0">
		 </label>
		 <button type="button" @click="fijarTime">Contar</button>
	</form>`,
	data () {
		 return {
			  minutes:0,
			  secondes:0
		 }
	},
	methods: {
		 fijarTime() {
			  this.$emit('set-time', {minutes:this.minutes, secondes:this.secondes})
		 }
	}
}

let Timer = {
	template: `
	<div class="container bg-info">
		 <div class="timer text-light">{{ time | prettify }}</div>
	</div>
	`,
	props:['time'],
	filters: {
		 prettify : function(value) {
			  let data = value.split(':')
			  let minutes = data[0]
			  let secondes = data[1]
			  if (minutes < 10) {
					minutes = "0"+minutes
			  }
			  if (secondes < 10) {
					secondes = "0"+secondes
			  }
			  return minutes+":"+secondes
		 }
	}
}

let app = new Vue({
	el:"#app",
	components: {
		 'timer-setup':timerSetup,
		 'timer':Timer
	},
	data: {
		 isRunning: false,
		 minutes:0,
		 secondes:0,
		 time:0,
		 timer:null,
		 sound:new Audio("https://r3---sn-buq-njal.googlevideo.com/videoplayback?expire=1584130592&ei=wJVrXtH1AdallQSDtJq4Bg&ip=111.118.12.122&id=o-AKFTyjTHQgcdln8xfd8kQWAoX5-cuG09B_ibunEDndB1&itag=251&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=36749&otfp=1&dur=2.361&lmt=1564432033684158&fvip=3&keepalive=yes&fexp=23842630&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cotfp%2Cdur%2Clmt&sig=ADKhkGMwRQIhANWuHJwbGfTWEPx98BYI1QOu5oLTEcnsxnFIjpUvEQpTAiAFCHbIJ67mSG_0MIFTnhhoCQLe_DmyyVdeBzBE4omPSA%3D%3D&title=AHH+MI+PICHULA+-+Efecto+de+sonido&title=AHH+MI+PICHULA+-+Efecto+de+sonido&cms_redirect=yes&mh=M8&mip=201.238.198.130&mm=31&mn=sn-buq-njal&ms=au&mt=1584108872&mv=m&mvi=2&pcm2cms=yes&pl=19&lsparams=mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=ABSNjpQwRQIhAIZjyrFHFSn_4fx9lXn_TK-zsjXdcOsiGkGMZ199ybbsAiBdHAKmyS-jMV6W3JmRpS7QnJqfUn_n9VRzznq50x4EqA%3D%3D")
	},
	computed: {
		prettyTime () {
			 let time = this.time / 60
			 let minutes = parseInt(time)
			 let secondes = Math.round((time - minutes) * 60)
			 return minutes+":"+secondes
		}
	},
	methods: {
		 start () {
			 this.isRunning = true
			 if (!this.timer) {
				  this.timer = setInterval( () => {
						if (this.time > 0) {
							 this.time--
							 document.getElementById("img1").src="marcianito.gif"

						} else {
							document.getElementById("img1").src="michel.gif"
							 clearInterval(this.timer)
							 this.sound.play()
							 this.reset()
						}
				  }, 1000 )
			 }
		 },
		 stop () {
			 this.isRunning = false
			 clearInterval(this.timer)
			 this.timer = null
		 },
		 reset () {
			  this.stop()
			  this.time = 0
			  this.secondes = 0
			  this.minutes = 0
		 },
		 setTime (payload) {
			 this.time = (payload.minutes * 60 + payload.secondes)
		 }
	}
})