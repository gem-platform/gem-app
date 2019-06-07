FROM codeception/codeceptjs
WORKDIR /tests
COPY . .
RUN npm install
CMD ["codeceptjs", "run", "--verbose"]