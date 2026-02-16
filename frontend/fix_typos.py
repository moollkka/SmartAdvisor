import os

files = [
    'src/screens/main/HistoryScreen.js',
    'src/screens/main/ModulesScreen.js',
    'src/screens/main/ProfileScreen.js'
]

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
            new_content = content.replace('useRecommendation', 'useRecommendations')
            new_content = new_content.replace('useRecommendations()', 'useRecommendations()')
        
        if content != new_content:
            with open(file_path, 'w') as f:
                f.write(new_content)
            print(f"Fixer {file_path}")
        else:
            print(f"{file_path} déjà correct ou modèle introuvable")
    else:
        print(f" Fichier non trouvé: {file_path}")
