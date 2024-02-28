#include <bits/stdc++.h>
using namespace std;

int n, m, a[54][54], result = 987654321;
vector<vector<int>> chickenList;
vector<pair<int, int>> home, chicken;

void combi(int start, vector<int> v){
    if(v.size() == m){
        chickenList.push_back(v);
        return;
    }

    for(int i = start + 1; i < chicken.size(); i++){
        v.push_back(i);
        combi(i, v);
        v.pop_back();
    }

    return;
}

int main(){
    cin >> n >> m;

    for(int i = 0; i < n; i++){
        for(int j = 0; j < n; j++){
            cin >> a[i][j];
            if(a[i][j] == 1) home.push_back({i,j});
            if(a[i][j] == 2) chicken.push_back({i,j});
        }
    }

    vector<int> v;
    combi(-1, v);

    for(vector<int> chk : chickenList){
        int ret = 0;
        for(pair<int, int> h : home){
            int _min = 987654321;
            for(int ch : chk){
                int cal = abs(h.first - chicken[ch].first) + abs(h.second - chicken[ch].second);
                _min = min(_min, cal);
            }
            ret += _min;
        }

        result = min(result, ret);
    }

    cout << result << "\n";
}