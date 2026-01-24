FROM php:8.2-cli

#Estensioni PHP necessarie per Laravel
RUN apt-get update && apt-get install -y \
    libpq-dev \
	git \
	unzip \
	&& docker-php-ext-install pdo pdo_pgsql
	
#Installazione Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Cartella di lavoro
WORKDIR /app

	