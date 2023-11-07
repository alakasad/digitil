FROM amd64/ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
ARG GLOBAL_PACKAGES="ca-certificates flac git lame locales opus-tools python-lxml python3 python3-pip python3-setuptools python3-wheel wget"
ARG HRVOICE_PACKAGES="scons build-essential libspeechd-dev pkg-config"
ARG PIP_PACKAGES="flask==2.3.3 pymorphy2 pymorphy2-dicts-ru rhvoice-wrapper scons lxml"

RUN apt-get -y update && \
    apt-get -y install software-properties-common && \
    apt-get -y install $GLOBAL_PACKAGES && \
    apt-get -y install $HRVOICE_PACKAGES && \
    add-apt-repository -y ppa:linvinus/rhvoice && \
    pip3 install $PIP_PACKAGES && \
    git clone https://github.com/RHVoice/RHVoice.git /opt/RHVoice && \
    cd /opt/RHVoice && \
    git submodule update --init && \
    scons && scons install && ldconfig && \
    git clone https://github.com/vantu5z/RHVoice-dictionary.git /opt/RHVoice-dictionary && \
    mkdir -p /usr/local/etc/RHVoice/ && \
    cp -R /opt/RHVoice-dictionary/dicts /usr/local/etc/RHVoice/dicts && \
    cp -R /opt/RHVoice-dictionary/tools/preprocessing /opt/rhvoice_tools && \
    cd /opt && mkdir /opt/cfg

COPY entrypoint.sh /opt/entrypoint.sh
COPY rhvoice_rest_cache.py /opt/rhvoice_rest_cache.py
COPY app.py /opt/app.py
COPY voices/dilnavoz /usr/local/share/RHVoice/voices/dilnavoz

EXPOSE 8080/tcp

ENTRYPOINT ["/bin/bash", "/opt/entrypoint.sh"]