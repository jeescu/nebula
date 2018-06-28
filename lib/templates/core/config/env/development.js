export default {
	name: 'development',
	db: {
		debug: true,
		client: 'mysql',
		connection: {
			host : 'localhost',
			port: "3306",
			user : 'xproj_dev',
			password : 'xproj_dev',
			database : 'xproj_dev'
		},
		pool: { 
			min: 2, 
			max: 10 
		}
	}
}