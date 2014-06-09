#wget http://salsa.faurax.fr/index.php/Paris -o olivier_paris_28042014.html
curl http://salsa.faurax.fr/index.php/Paris > olivier_paris_28042014.html
python parse_and_get_event_links.py --filename=olivier_paris_28042014.html

