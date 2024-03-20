./build-docker.sh
./push.sh

echo "Now restart pods..."
 kubectl delete pods -l app=spa-team-1
 kubectl get pods -l app=spa-team-1
