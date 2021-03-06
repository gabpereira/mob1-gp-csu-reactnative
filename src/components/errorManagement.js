const errorManage = (code = null) => {
	code = code ? parseInt(code) : "inconnu";

	switch (code) {
		case 401:
		return {
			type: 'error',
			text1: 'Erreur 401',
			text2: "Votre identifiant ou mot de passe n'est pas correct. \nVeuillez les vérifier avant de réessayer!",
		}; 
		break;

		case 500:
		return {
			type: 'error',
			text1: 'Une erreur côté serveur est survenue.',
			text2: "Essayer de vous déconnecter et reconnecter.\nSi l'erreur persiste contactez un administrateur pour plus d'infos."
		};
		break;

		default:
		return {
			type: 'error',
			text1: 'Erreur ' + code,
			text2: "Vérifiez si vous êtes connecté à internet!\nSi l'erreur persiste contactez un administrateur pour plus d'infos.",
		};
	}
}
export default errorManage;