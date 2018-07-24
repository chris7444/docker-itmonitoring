ARG BRANCH

#https://docs.docker.com/engine/reference/builder/
FROM splunk/splunk:${BRANCH}

ENV SPLUNK_BACKUP_APP ${SPLUNK_BACKUP_DEFAULT_ETC}/etc/apps

# Enable HEC with default token - 00000000-0000-0000-0000-000000000000
RUN rm -rf ${SPLUNK_BACKUP_APP}/splunk_httpinput
COPY /splunk_httpinput ${SPLUNK_BACKUP_APP}/splunk_httpinput

COPY /app-docker ${SPLUNK_BACKUP_APP}/app-docker
COPY /ta-dockerlogs_fileinput ${SPLUNK_BACKUP_APP}/ta-dockerlogs_fileinput
    
# Enable UCP Monitoring 
COPY /ta-ucplogs-sysloginput ${SPLUNK_BACKUP_APP}/ta-ucplogs-sysloginput


# Copy Windows Monitoring Stuff
COPY /splunk_app_windows_infrastructure ${SPLUNK_BACKUP_APP}/splunk_app_windows_infrastructure
COPY /Splunk_TA_windows  ${SPLUNK_BACKUP_APP}/Splunk_TA_windows
COPY /Splunk_TA_microsoft_dns ${SPLUNK_BACKUUP_APP}/Splunk_TA_microsoft_dns
COPY /Splunk_TA_microsoft_ad  ${SPLUNK_BACKUP_APP}/Splunk_TA_microsoft_ad
COPY /SA-ldapsearch ${SPLUNK_BACKUP_APP}/SA-ldapsearch

#
# Copy Kubernetes App
#
COPY /app-k8s ${SPLUNK_BACKUP_APP}/app-k8s

# Copy mycertificates
COPY /mycerts ${SPLUNK_BACKUP_APP}/../mycerts

# Copy SSL enabling settings
COPY /mycerts/inputs.conf  ${SPLUNK_BACKUP_APP}/../system/local/inputs.conf
COPY /mycerts/server.conf  ${SPLUNK_BACKUP_APP}/../system/local/server.conf
