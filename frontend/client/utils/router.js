export class Router {
    constructor(app, routes) {
        this.app = app; // Phần tử DOM nơi component sẽ được render
        this.routes = routes; // Đối tượng chứa các đường dẫn và component tương ứng
        this.currentComponent = null; // Tham chiếu đến component hiện tại
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
        this.handleRouteChange(); // Xử lý route ban đầu khi trang được tải
    }

    // async handleRouteChange() {
    //     const hash = window.location.hash.slice(1) || '/';
    //     console.log('Handling route change for hash:', hash);
    //     const routeInfo = this.findRoute(hash);
        
    //     if (routeInfo) {
    //         if (this.currentComponent && typeof this.currentComponent.unmount === 'function') {
    //             this.currentComponent.unmount();
    //         }
            
    //         const { component: Component, params } = routeInfo;
            
    //         if (typeof Component !== 'function') {
    //             console.error('Invalid component for route:', hash);
    //             return this.showErrorPage();
    //         }
            
    //         this.currentComponent = new Component(params);
            
    //         try {
    //             await this.currentComponent.render(this.app);
    //             console.log(`Rendered component for route: ${hash}`);
                
    //             // Cập nhật tiêu đề trang nếu component có thuộc tính title
    //             if (this.currentComponent.title) {
    //                 document.title = this.currentComponent.title;
    //             }
                
    //         } catch (error) {
    //             console.error('Error rendering component:', error);
    //             this.showErrorPage();
    //         }
    //     } else {
    //         this.showNotFoundPage();
    //     }
    // }

    async handleRouteChange() {
        const hash = window.location.hash.slice(1) || '/';
        console.log('Handling route change for hash:', hash);
        const routeInfo = this.findRoute(hash);
        
        if (routeInfo) {
            if (this.currentComponent && typeof this.currentComponent.unmount === 'function') {
                this.currentComponent.unmount();
            }
            
            const { component: Component, params } = routeInfo;
            
            if (typeof Component !== 'function') {
                console.error('Invalid component for route:', hash);
                return this.showErrorPage();
            }
    
            // Chỉ truyền đúng giá trị id cho component nếu có
            this.currentComponent = new Component(params ? params.id : null);
            
            try {
                await this.currentComponent.render(this.app);
                console.log(`Rendered component for route: ${hash}`);
                
                if (this.currentComponent.title) {
                    document.title = this.currentComponent.title;
                }
            } catch (error) {
                console.error('Error rendering component:', error);
                this.showErrorPage();
            }
        } else {
            this.showNotFoundPage();
        }
    }
    

    findRoute(hash) {
        for (const path in this.routes) {
            const pathToRegex = new RegExp(`^${path.replace(/:\w+/g, '([^/]+)')}$`);
            const match = pathToRegex.exec(hash);
            if (match) {
                const params = this.extractParams(path, match);
                return { path, component: this.routes[path], params };
            }
        }
        console.log('No route found for hash:', hash);
        return null;
    }
    
    extractParams(routePath, match) {
        const names = routePath.split('/').filter(part => part.startsWith(':')).map(part => part.substring(1));
        const values = match.slice(1);
        return names.reduce((params, name, index) => {
            params[name] = values[index];
            return params;
        }, {});
    }
    
    showNotFoundPage() {
        this.app.innerHTML = '<h1>404 - Không tìm thấy trang</h1>';
        console.log('Displayed 404 not found page');
    }

    showErrorPage() {
        this.app.innerHTML = '<h1>Đã xảy ra lỗi khi tải trang</h1>';
        console.log('Displayed error page');
    }
}
