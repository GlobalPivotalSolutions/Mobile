#!/bin/bash
# File              : generate.sh
# Date              : 07.07.2018
# Last Modified Date: 07.07.2018
# File              : generate.sh
# Date              : 07.07.2018
# Last Modified Date: 07.07.2018
rm -Rf vx
meteor-kitchen https://www.meteorkitchen.com/api/getapp/json/km2rHoM2v6F6Tw9bd vx -n
cd vx
meteor npm install
echo " now run meteor"
