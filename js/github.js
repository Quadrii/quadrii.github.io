// eb842548f346abbdfb3cbd95557a5d27c0e73530
class Github {
	constructor () {
		this.client_ID = '426ce3bf615fdd02e485';
		this.client_secret = 'eb842548f346abbdfb3cbd95557a5d27c0e73530';
		this.repos_count = 10;
		this.repos_sort = 'created: asc';
	}
	async getUser(user) {
		const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_ID}&client_secret=${this.client_secret}`);
		const profile = await profileResponse.json();

		const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.reos_count}&sort=${this.repos_sort}&client_id=${this.client_ID}&client_secret=${this.client_secret}`);
		const repos = await reposResponse.json();
		return {
			profile,
			repos
		}
	}
}