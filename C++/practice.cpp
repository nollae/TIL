#include <bits/stdc++.h>
using namespace std;

const int V = 10;
vector<int> a[V];
int visited[V];

void go(int from){
    visited[from] =  1;
    cout << from << "\n";

    for(int it : a[from]){
        if(visited[it]) continue;
        go(it);
    }
}

int main(){
    a[1].push_back(2);
    a[2].push_back(1);

    a[1].push_back(3);
    a[3].push_back(1);

    a[3].push_back(4);
    a[4].push_back(3);

    for(int i = 0; i < V; i++){
        if(a[i].size() && visited[i] == 0) go(i);
    }
}