const modeActionTypes = {
	SET_ANALYSIS: 'SET_ANALYSIS_MODE',
	SET_GRANDMASTER: 'SET_GRANDMASTER_MODE',
	SET_LOADFEN: 'SET_LOADFEN_MODE',
	SET_LOADPGN: 'SET_LOADPGN',
	SET_PLAY: 'SET_PLAY_MODE',
	ACCEPT_PLAY: 'ACCEPT_PLAY_MODE',
	DRAW_ACCEPT: 'DRAW_ACCEPT',
	DRAW_DECLINE: 'DRAW_DECLINE',
	DRAW_PROPOSE: 'DRAW_PROPOSE',
	TAKEBACK_ACCEPT: 'TAKEBACK_ACCEPT',
	TAKEBACK_DECLINE: 'TAKEBACK_DECLINE',
	TAKEBACK_PROPOSE: 'TAKEBACK_PROPOSE',
	RESIGN_ACCEPT: 'RESIGN_ACCEPT',
	RESIGN_DECLINE: 'RESIGN_DECLINE',
	RESIGN_PROPOSE: 'RESIGN_PROPOSE',
	TIMER_OVER: 'TIMER_OVER',
	REMATCH_ACCEPT: 'REMATCH_ACCEPT',
	REMATCH_DECLINE: 'REMATCH_DECLINE',
	REMATCH_PROPOSE: 'REMATCH_PROPOSE',
	LEAVE_ACCEPT: 'LEAVE_ACCEPT',
	GRANDMASTER_MOVETEXT: 'GRANDMASTER_MOVETEXT'
};

export default modeActionTypes;
