while true
	do
		# countdown for server start
		for i in 4 2
		do
			echo -e "\e[96m\e[1m Starting server WIREBOT in $i seconds! \e[0m"
			sleep 2
		done

		# start server
		echo -e "\e[0m"
		echo -e "\e[97m\e[1m=> Booting up $SCREENNAME server! \e[0m"

			bash -c "node bot.js"

		# wait before restarting server
		for i in 10 5
		do
			echo -e "\e[93m\e[1m Session restart in $i seconds! \e[31m[ use CTRL+C to force terminate WIREBOT server ] \e[0m"
			sleep 5
		done
done
