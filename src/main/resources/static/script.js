// On définit la catégorie à sauvegarder
        // Note : on pourrait aussi le récupérer depuis un formulaire de saisie
        const categorieASauvegarder = {
            "libelle": "Quincaillerie",
            "description": "clous, vis, boulons"
        };

        // Montrer les résultats quand tout s'est bien passé
        function showResult(resultJson) {
            // cf. https://developer.mozilla.org/en-US/docs/Web/API/console#outputting_text_to_the_console
            console.log("Réponse de l'API : %o", resultJson);
        }

        // Afficher les erreurs quand l'API a signalé une erreur
        function showError(error) {
            console.error("L'API signale l'erreur %o", error);
        }

        /**
         * Faire un appel AJAX avec l'API fetch
         * Permet de récupérer erreur réseau et erreur de l'API
         * usage :
         * doAjaxRequest(url, options).then(showResult).catch(showError);
         * @param {string} url L'URL de l'API
         * @param {object} options Les options de la requête AJAX
         * @returns {Promise} Une promesse qui sera résolue avec le résultat de l'appel AJAX
         * @throws {object} Une exception qui sera levée si l'API a signalé une erreur
         */
        async function doAjaxRequest(url, options) {
            // On fait l'appel AJAX
            const response = await fetch(url, options);
            // On récupère le résultat transmis en format JSON
            const result = await response.json();
            // L'API a signalé une erreur, on lève une exception
            if (!response.ok) throw result;
            // Tout s'est bien passé, on renvoie le résultat
            return result;
        }


        function enregistreCategorie() {
            console.log("Données envoyées : %o", categorieASauvegarder);
            const options = {
                method: "POST",
                headers: { // On indique qu'on envoie du JSON
                    "Content-Type": "application/json"
                },
                // On envoie les données au format JSON
                // dans le corps de la requête
                body: JSON.stringify(categorieASauvegarder)
            };
            fetch("api/categories", options)
                // Si pas d'erreur réseau, on convertit le json reçu en objet javascript
                .then(response => response.json())
                // On affiche le résultat (même s'il y a eu une erreur de l'API)
                .then(showResult)
                // en cas d'erreur réseau
                .catch(showError);
        }

