<template>
    <v-container>
		<v-layout row wrap>
			<v-flex xs12>
				<div>
					<div>
						<label for="select_timer">Counter</label>
						<select name="select_timer" id="select_timer" v-model="focusTime">
							<option v-for="(v) in 59" :key="v" :value="v">{{ v }}</option>
						</select>
					</div>
					<div>
						<label for="select_timer_break">Break Time</label>
						<select name="select_timer_break" id="select_timer_break" v-model="breakTime">
							<option v-for="v in 59" :key="v" value="v">{{ v }}</option>
						</select>
					</div>
				</div>
				<div class="main-div pa-5" style="border:1px solid black; background-color: lightgreen;">
					<div class="counter-div">
						<p>{{ displayTimeLeft() }}</p>
					</div>
					<div class="actions-div">
						<v-btn type="button" primary flat @click="startTimer" 
							v-if="!playing && !paused" class="left">Start</v-btn>
						<v-btn type="button" primary flat @click="pauseTimer"
							v-if="!paused && playing" class="left">Pause</v-btn>
						<v-btn type="button" primary flat @click="continueTimer"
							v-if="paused && !playing" class="left">Continue</v-btn>
						<v-btn type="button" primary flat @click="stopTimer"
							class="right">Stop</v-btn>
					</div>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
    data: function() {
        return {
            focusTime: 2,
			breakTime: 1,
			isBreak: false,
            playing: false,
            paused: false,
			stopped: false,
			timeIntervalId: null,
			timeTimeoutId: null,
			minutesLeft: 2,
			secondsLeft: 0
        }
	},
	
	computed: {
		countTime: function() {
			return this.focusTime * 60 * 1000;
		}
	},

    created: function() {
		console.log("FOCUS");
	},

	mounted: function() {
		this.timeIntervalId = null;
		this.timeTimeoutId = null;
	},

	beforeDestroy: function() {
		if(this.timeIntervalId) {
			clearInterval(this.timeIntervalId);
			this.timeIntervalId = null;
		}
		if(this.timeTimeoutId) {
			clearTimeout(this.timeTimeoutId);
			this.timeTimeoutId = null;
		}
	},
	
	methods: {
		displayTimeLeft: function() {
			if(this.isBreak) {
				return "BREAK TIME";
			}

			let minutes = this.minutesLeft < 10 ? "0" + this.minutesLeft : this.minutesLeft;
			let seconds = this.secondsLeft < 10 ? "0" + this.secondsLeft : this.secondsLeft;

			return minutes + ":" + seconds;
		},
		startTimer: function() {
			this.minutesLeft = this.focusTime;
			this.secondsLeft = 0;
			this.timeIntervalId = setInterval(function() {
				this.secondsLeft -= 1;
				console.log(this.secondsLeft);
				if(this.secondsLeft < 0) {
					this.minutesLeft--;
					this.secondsLeft = 59;
				}
				if(this.minutesLeft <= 0) {
					this.isBreak =  true;
					// stop this;
				}

				this.playing = true;
			}.bind(this), 1000);
			
			this.timeTimeoutId = setTimeout(function() {
				this.isBreak = true;
			}.bind(this), this.focusTime * 60 * 1000);
			console.log(this.timeIntervalId, this.timeTimeoutId);
		},
		pauseTimer: function() {
			if(this.timeIntervalId) {
				clearInterval(this.timeIntervalId);
				this.timeIntervalId = null;
			}
			if(this.timeTimeoutId) {
				clearTimeout(this.timeTimeoutId);
				this.timeTimeoutId = null;
			}
			this.playing = false;
			this.paused = true;
		},
		continueTimer: function() {
			this.timeIntervalId = setInterval(function() {
				this.secondsLeft -= 1;
				console.log(this.secondsLeft);
				if(this.secondsLeft < 0) {
					this.minutesLeft--;
					this.secondsLeft = 59;
				}
				if(this.minutesLeft <= 0) {
					this.isBreak =  true;
					// stop this;
				}

				this.playing = true;
			}.bind(this), 1000);
			
			this.timeTimeoutId = setTimeout(function() {
				this.isBreak = true;
			}.bind(this), this.focusTime * 60 * 1000);

			this.playing = true;
			this.paused = false;
		},
		stopTimer: function() {
			if(this.timeIntervalId) {
				clearInterval(this.timeIntervalId);
				this.timeIntervalId = null;
			}
			if(this.timeTimeoutId) {
				clearTimeout(this.timeTimeoutId);
				this.timeTimeoutId = null;
			}

			this.seconds = 0;

			this.playing = false;
			this.paused = false;
			this.isBreak = false;
		}
	}
}
</script>

<style scoped>

	.main-div {
		display: flex;
		flex-flow: column;
	}

	.main-div::before, .main-div::after {
		clear: both;
	}

	.counter-div {
		align-self: center;
		justify-self: center;
		text-align: center;
		padding: 15px;
		font-size: 2em;
		width: 100%;
		float: left;
	}

	.actions-div {
		width: 100%;
		float: left;
	}

</style>
