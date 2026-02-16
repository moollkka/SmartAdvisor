import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const CustomDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme, themeMode } = useContext(ThemeContext);

  // Helper function to display user name
  const displayName = user
    ? user.prenom && user.nom
      ? `${user.prenom} ${user.nom}`
      : user.name || user.email?.split("@")[0] || "User"
    : "Guest User";

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* User Profile Section */}
        <View
          style={[
            styles.profileSection,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <View style={styles.avatarContainer}>
            <Ionicons
              name="person-circle"
              size={80}
              color="#fff"
              style={styles.avatarIcon}
            />
          </View>
          <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
            {displayName}
          </Text>
          {user?.email && (
            <Text
              style={styles.userEmail}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user.email}
            </Text>
          )}
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>

        {/* Theme Toggle */}
        <TouchableOpacity
          style={[
            styles.drawerItem,
            {
              borderTopColor: theme.colors.border,
              borderTopWidth: StyleSheet.hairlineWidth,
            },
          ]}
          onPress={toggleTheme}
        >
          <Ionicons
            name={themeMode === "dark" ? "sunny" : "moon"}
            size={24}
            color={theme.colors.text}
          />
          <Text
            style={[styles.drawerItemText, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={[
            styles.drawerItem,
            {
              borderTopColor: theme.colors.border,
              borderTopWidth: StyleSheet.hairlineWidth,
            },
          ]}
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text
            style={[styles.drawerItemText, { color: "#FF3B30" }]}
            numberOfLines={1}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <Text style={[styles.footerText, { color: theme.colors.gray }]}>
          SmartAdvisor v1.0
        </Text>
        <Text style={[styles.footerText, { color: theme.colors.gray }]}>
          © 2025 University Recommender
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  profileSection: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 25,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatarIcon: {
    opacity: 0.9,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
    maxWidth: "100%",
    textAlign: "center",
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    maxWidth: "100%",
    textAlign: "center",
  },
  drawerItemsContainer: {
    paddingTop: 10,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    fontSize: 15,
    marginLeft: 16,
    flex: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
  },
  footerText: {
    fontSize: 11,
    marginBottom: 4,
    opacity: 0.7,
  },
});

export default CustomDrawer;
