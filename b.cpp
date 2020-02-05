#include <bits/stdc++.h>
using namespace std;
// 8 Direction
int dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};
int dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};

int Weight1[8][8] = {
	{4, -3, 2, 2, 2, 2, -3, 4},
	{-3, -4, -1, -1, -1, -1, -4, -3},
	{2, -1, 1, 0, 0, 1, -1, 2},
	{2, -1, 0, 1, 1, 0, -1, 2},
	{2, -1, 0, 1, 1, 0, -1, 2},
	{2, -1, 1, 0, 0, 1, -1, 2},
	{-3, -4, -1, -1, -1, -1, -4, -3},
	{4, -3, 2, 2, 2, 2, -3, 4}
};

class Oh__Othello {
private:
	vector<vector<int>> Place_Board;
	map<pair<int, int>, pair<int, int>> Valid_Board;
	int player;
	int Value;
	pair<int, int> boo;
public:
	Oh__Othello(int player) {
		this->player = player;
		this->Value = 0;
		Place_Board.resize(8, vector<int>(8));
		Valid_Board.clear();
	}
	void reset();
	void debug();
	void play();
	void Valid_Moves();
	void Print_Board();
	void refresh(int, int);
	void Amar_Pocha_AI();
	void clean();
};

void Oh__Othello::Print_Board() {
	for (int i = 1; i <= 8; ++i) cout << "  " << i << "";
	cout << endl;
	int j = 1;
	for (auto row : Place_Board) {
		cout << j++;
		for (auto col : row) {
			//cout << col << " ";
			if (col == 1) cout << " " <<(char) 220 << " ";
			else if (col == 2) cout << " " << (char) 157 << " ";
			else if (col == 3) cout << " " << 'o' << " ";
			else cout << " " << (char) 176 << " ";
		}
		cout << endl << endl;
	}
}

void Oh__Othello::debug() {
	for (auto first : Place_Board) {
		for (auto second : first) {
			cout << second << " ";
		}
		cout << endl;
	}
}

void Oh__Othello::reset() {
	for (auto first : Place_Board) {
		for (auto& second : first) {
			second = 0;
		}
	}
	Place_Board[3][3] = Place_Board[4][4] = 1;
	Place_Board[4][3] = Place_Board[3][4] = 2;

    Valid_Board.clear();
}

void Oh__Othello::Valid_Moves() {
	auto ok = [&](int x, int y) {
		return ((x >= 0 and x < 8) && (y >= 0 and y < 8));
	};
    auto valid = [&](int row, int col) {
		for (int i = 0; i < 8; ++i) {
			int x = row + dx[i];
			int y = col + dy[i];

			if (ok(x, y) and Place_Board[x][y] == 3 - player) {
				bool ret = false;

				x += dx[i];
				y += dy[i];
				while (ok(x, y)) {
					if (Place_Board[x][y] == player) {
						Valid_Board[{row, col}] = {x, y};
						ret = true;
						// cout << x << " " << y << endl;
						break;
					}
					else if (Place_Board[x][y] == 0) break;
					else if (Place_Board[x][y] == 3) break;
					x += dx[i];
					y += dy[i];
				}
				if (ret) return true;
			}
    	}
    	return false;
    };

	for (int i = 0; i < 8; ++i) {
		for (int j = 0; j < 8; ++j) {
			if (Place_Board[i][j] == 0) {
				if (valid(i, j)) {
					Place_Board[i][j] = 3;
				}
			}
		}
	}
	// debug();
	// cout << player << endl;
}
void Oh__Othello::clean() {
	Valid_Board.clear();
	// debug();
	for (int i = 0; i < 8; ++i) {
		for (int j = 0; j < 8; ++j) {
			if (Place_Board[i][j] == 3) Place_Board[i][j] = 0;
		}
	}
}
void Oh__Othello::refresh(int x, int y) {
	pair<int, int> ax = Valid_Board[{x, y}];
	// cout << ax.first << " " << ax.second << endl;
	if(player == 2) cout << " FROM " << ax.first + 1 << " " << ax.second + 1 << endl;
	if (ax.first == x) {
		for (int i = min(ax.second, y); i <= max(ax.second, y); ++i) {
			Place_Board[x][i] = player;
		}
	}
	else if(ax.second == y) {
		for (int i = min(ax.first, x); i <= max(ax.first, x); ++i) {
			Place_Board[i][y] = player;
		}
	}
	else {
		int a = ax.first;
		int b = ax.second;

		if (x > a) {
			// Niche Ache
			if (y < b) {
				// Left e Ache
				while (x != a and y != b) {
					a += 1;
					b -= 1;
					Place_Board[a][b] = player;
				}
			}
			else {
				// Right e Ache
				while (x != a and y != b) {
					a += 1;
					b += 1;
					Place_Board[a][b] = player;
				}
			}
		}
		else {
			// Upore Ache
			if (y < b) {
				// Left e Ache
				while (x != a and y != b) {
					a -= 1;
					b -= 1;
					Place_Board[a][b] = player;
				}
			}
			else {
				// Right e Ache
				while (x != a and y != b) {
					a -= 1;
					b += 1;
					Place_Board[a][b] = player;
				}
			}
		}
	}
	clean();
	// debug();
}
void Oh__Othello::Amar_Pocha_AI() {
	Valid_Moves();
	// Create New Boards With This Moves
	auto Create_New_Board = [&](auto moves) {
		Oh__Othello NBoard(player);
		NBoard.clean();
		// NBoard.Value = Weight1[moves.first.first][moves.first.second];
		auto ValueCount = [&]() {
			pair<int, int> ax = moves.second;
			int x = moves.first.first;
			int y = moves.first.second;
			// NBoard.Value = 0;
			if (ax.first == x) {
				for (int i = min(ax.second, y); i <= max(ax.second, y); ++i) {
					// Place_Board[x][i] = player;
					NBoard.Value += Weight1[x][i];
				}
			}
			else if(ax.second == y) {
				for (int i = min(ax.first, x); i <= max(ax.first, x); ++i) {
					// Place_Board[i][y] = player;
					NBoard.Value += Weight1[x][i];
				}
			}
			else {
				int a = ax.first;
				int b = ax.second;

				if (x > a) {
					// Niche Ache
					if (y < b) {
						// Left e Ache
						NBoard.Value += Weight1[a][b];
						while (x != a and y != b) {
							a += 1;
							b -= 1;
							// Place_Board[a][b] = player;
							NBoard.Value += Weight1[a][b];
						}
					}
					else {
						// Right e Ache
						NBoard.Value += Weight1[a][b];
						while (x != a and y != b) {
							a += 1;
							b += 1;
							// Place_Board[a][b] = player;
							NBoard.Value += Weight1[a][b];
						}
					}
				}
				else {
					// Upore Ache
					if (y < b) {
						// Left e Ache
						NBoard.Value += Weight1[a][b];
						while (x != a and y != b) {
							a -= 1;
							b -= 1;
							// Place_Board[a][b] = player;
							NBoard.Value += Weight1[a][b];
						}
					}
					else {
						// Right e Ache
						NBoard.Value += Weight1[a][b];
						while (x != a and y != b) {
							a -= 1;
							b += 1;
							// Place_Board[a][b] = player;
							NBoard.Value += Weight1[a][b];
						}
					}
				}
			}
		};
		ValueCount();

		NBoard.boo.first = moves.first.first;
		NBoard.boo.second = moves.first.second;
		return NBoard;
	};
	int mini = -1;
	Oh__Othello best(player);
	for (auto moves : Valid_Board) {
		Oh__Othello fun = Create_New_Board(moves);
		cout << fun.Value << " = (" << moves.second.first << "," << moves.second.second << ") --> (" << fun.boo.first + 1 << "," << fun.boo.second + 1 <<")" << endl;

		if (fun.Value > mini) {
			mini = fun.Value;
			best = fun;
			// cout << " Entered\n";
		}
	}
	cout << "AI MOVED TO " << best.boo.first + 1 << " " << best.boo.second + 1;
	refresh(best.boo.first, best.boo.second);
	clean();
}
void Oh__Othello::play() {
	if (player == 2) {
		// AI Will Play.
		Amar_Pocha_AI();
		player = 3 - player;
	}
	Valid_Moves();
	 // debug();
	Print_Board();
	cout << "Valid Moves" << endl;
	// cout << Valid_Board.size() << endl;
	for (auto x : Valid_Board) {
		cout << x.first.first + 1 << " " << x.first.second + 1 << endl;
	}
	// cout << "Enter Your Choice: ";
	int x, y;
	while (cin >> x >> y) {
		if (Place_Board[x - 1][y - 1] == 3) break;
	}
	cout << endl;

	if (x + y == -2) return;
	refresh(x - 1, y - 1);
	//Print_Board();
	player = 3 - player;
	play();
}
int main() {
	ios::sync_with_stdio(false);
	cin.tie(0);


	Oh__Othello foo(1);
	foo.reset();
	// foo.debug();
	foo.play();
	return 0;
}
