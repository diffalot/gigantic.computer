# Directories
TARGET_DIR = dist

# Binaries
WEBPACK = ./node_modules/.bin/webpack
WEBPACK_DEV_SERVER = ./node_modules/.bin/webpack-dev-server
STANDARD = ./node_modules/.bin/standard
SURGE = ./node_modules/.bin/surge
NPM = npm

.PHONY: dist clean watch node_modules

build: $(TARGET_DIR)

deploy: build
	$(SURGE) -p dist -d sees.earth

clean:
	rm -rf $(TARGET_DIR)

static: index

index:
	mkdir -p $(TARGET_DIR)
	cp ./src/index.html $(TARGET_DIR)

lint:
	$(STANDARD)

watch: clean static
	$(WEBPACK_DEV_SERVER) --debug --devtool source-map --output-pathinfo --progress --watch --host 0.0.0.0 --inline --hot --content-base $(TARGET_DIR)/

$(TARGET_DIR): lint clean static
	$(WEBPACK) --optimize-minimize

node_modules:
	$(NPM) install
